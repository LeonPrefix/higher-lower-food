import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export function EndScreen({ open, score, restart }: { open: boolean; score: number; restart: () => void }) {
  return (
    <Dialog open={open} onOpenChange={restart}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Das war leider falsch :(</DialogTitle>
        </DialogHeader>
        <span className="text-xl">
          Deine erreichte Punktzahl: <span className="text-3xl font-bold">{score}</span>
        </span>
      </DialogContent>
    </Dialog>
  );
}
