
-- Nivesh Vichar: Initial authentication profile schema

-- 1. Create user profiles table
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);

-- 2. Enable Row Level Security
alter table public.profiles enable row level security;

-- 3. Remove existing policies if present
drop policy if exists "Users can read own profile"
  on public.profiles;

drop policy if exists "Users can update own profile"
  on public.profiles;

-- 4. Users can only read their own profile
create policy "Users can read own profile"
  on public.profiles
  for select
  to authenticated
  using ((select auth.uid()) = id);

-- 5. Users can only update their own profile
create policy "Users can update own profile"
  on public.profiles
  for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- 6. Explicitly control table permissions
revoke all on table public.profiles
  from public, anon, authenticated;

grant select on table public.profiles
  to authenticated;

grant update (full_name) on table public.profiles
  to authenticated;

-- 7. Create the automatic profile creation function
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- 8. Restrict direct execution of the trigger function
revoke all on function public.handle_new_user()
  from public, anon, authenticated;

-- 9. Create the signup trigger
drop trigger if exists on_auth_user_created
  on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
