import React from "react";
import { FlaskConical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DemoBadge({ className }) {
  return (
    <Badge variant="muted" className={className}>
      <FlaskConical className="mr-1 h-3 w-3" /> Sample / Demo Data
    </Badge>
  );
}

export function ConfirmDialog({ open, onOpenChange, title, description, onConfirm, confirmLabel = "Confirm", variant = "default" }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button
            variant={variant}
            onClick={() => {
              onConfirm?.();
              onOpenChange(false);
            }}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
