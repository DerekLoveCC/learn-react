import { type ReactNode } from "react";

type HintInfoBoxProps = {
  mode: "hint";
  children: ReactNode;
};

type WarningInfoBoxProps = {
  mode: "warning";
  severity: "low" | "medium" | "high";
  children: ReactNode;
};

type InfoBoxProps = HintInfoBoxProps | WarningInfoBoxProps;

export function InfoBox(props: InfoBoxProps) {
  const { mode, children } = props;
  if (mode === "hint") {
    return (
      <aside className="infobox infobox-hint">
        <p>{children}</p>
      </aside>
    );
  }

  return (
    <aside className={`infobox infobox-warning warning--${props.severity}`}>
      <h2>Warning</h2>
      <p>{children}</p>
    </aside>
  );
}
