-- Récurrence automatique des modèles de tâches (Modelli -> Attività).

create type task_recurrence as enum ('none', 'monthly', 'quarterly', 'yearly');

alter table task_templates
  add column recurrence task_recurrence not null default 'none',
  add column next_due_date date;
