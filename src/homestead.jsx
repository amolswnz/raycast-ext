import { ActionPanel, Action, List } from "@raycast/api";
import { useEffect, useState } from "react";
import { runAppleScript } from "run-applescript";

export default function Command() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const runInTerminal = (command) => {
    const script = `
    tell application "Terminal"
      do script "${command.replaceAll('"', '\\"')}"
      activate
    end tell
    `;
  
    runAppleScript(script);
  };

  
  return (
    <List navigationTitle="Homestead">
      <List.Item
        title="Homestead commands"
        subtitle="#1"
        actions={
          <ActionPanel title="#1 in raycast/extensions">
            <Action.OpenInBrowser url="https://github.com/raycast/extensions/pull/1" />
            <Action.CopyToClipboard title="Copy Pull Request Number" content="#1" />
            <Action title="Close Pull Request" onAction={() => console.log("Close PR #1")} />
          </ActionPanel>
        }
      />
      <List.Item
        title="Homestead reload"
        subtitle="#1"
        actions={
          <ActionPanel title="#open code">
            {/* <Action.CopyToClipboard title="Copy Pull Request Number" content="#open code" /> */}
            <Action
              title="Close Pull Request"
              onAction={() => {
                runInTerminal('ls -la');
              }}
            />
          </ActionPanel>
        }
      />
    </List>
  );
}

// tell application "iTerm" to tell the first window to tell current session to write text "ls -la"
// <Action
// title="Execute in Terminal.app"
// icon={Icon.Window}
// onAction={() => {
//   closeMainWindow();
//   popToRoot();
//   addToRecentlyUsed(command);
//   runInTerminal(command);
// }}
// />
