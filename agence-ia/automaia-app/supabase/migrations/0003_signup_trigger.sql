-- AutomaIA — création automatique du studio + owner à l'inscription.
-- Le studio_name et full_name transitent via `options.data` de supabase.auth.signUp()
-- (stockés dans auth.users.raw_user_meta_data). SECURITY DEFINER : bypass RLS,
-- s'exécute quel que soit l'état de confirmation de l'email (le trigger tourne
-- à l'INSERT dans auth.users, pas à la confirmation).

create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  new_studio_id uuid;
begin
  insert into studios (name)
  values (coalesce(new.raw_user_meta_data ->> 'studio_name', 'Il mio studio'))
  returning id into new_studio_id;

  insert into users (id, studio_id, full_name, role)
  values (new.id, new_studio_id, new.raw_user_meta_data ->> 'full_name', 'owner');

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function handle_new_user();
