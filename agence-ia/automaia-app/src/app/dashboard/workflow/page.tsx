import { NewTaskDialog } from "./new-task-dialog";
import { TaskBoard } from "./task-board";
import { TemplatesPanel } from "./templates-panel";
import { WorkflowTabs } from "./workflow-tabs";
import { createClient } from "@/lib/supabase/server";

export default async function WorkflowPage() {
  const supabase = createClient();

  const [{ data: tasks }, { data: templates }] = await Promise.all([
    supabase.from("tasks").select("*").order("created_at", { ascending: false }),
    supabase.from("task_templates").select("*").order("title"),
  ]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Workflow di studio</h1>
        <NewTaskDialog />
      </div>
      <WorkflowTabs
        tasksSection={<TaskBoard tasks={tasks ?? []} />}
        templatesSection={<TemplatesPanel templates={templates ?? []} />}
      />
    </div>
  );
}
