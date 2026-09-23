"use client";

// Manuvo - campo di composizione di un messaggio (artigiano o admin).
// Usa un'azione server passata come prop ; svuota il campo dopo l'invio.
import { useActionState, useEffect, useRef } from "react";

export type MessageState = { error?: string; success?: boolean } | undefined;

export function MessageComposer({
  action,
  userId,
  placeholder,
  sendLabel,
  errorLabel,
}: {
  action: (prev: MessageState, formData: FormData) => Promise<MessageState>;
  userId?: string;
  placeholder: string;
  sendLabel: string;
  errorLabel: string;
}) {
  const [state, formAction, pending] = useActionState<MessageState, FormData>(
    action,
    undefined,
  );
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (state?.success && ref.current) ref.current.value = "";
  }, [state]);

  return (
    <form action={formAction} className="mt-4 flex flex-col gap-2">
      {userId && <input type="hidden" name="userId" value={userId} />}
      <textarea
        ref={ref}
        name="body"
        required
        rows={3}
        maxLength={2000}
        placeholder={placeholder}
        className="resize-y rounded-lg border border-neutral-300 px-3 py-2.5 text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20"
      />
      <div className="flex items-center justify-between gap-3">
        {state?.error ? (
          <span className="text-sm text-red-700">{errorLabel}</span>
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800 disabled:opacity-60"
        >
          {sendLabel}
        </button>
      </div>
    </form>
  );
}
