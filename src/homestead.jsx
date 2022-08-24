import { ActionPanel, Action, List, Color, Icon } from "@raycast/api";
import { useEffect, useState } from "react";
import { runAppleScript } from "run-applescript";

export default function Command() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const runInTerminal = (command) => {
    // command += '&& printf "%s " "Press enter to continue"';
    // command += "&& read ans";

    const script = `
    -- Set this property to true to open in a new window instead of a new tab
    property open_in_new_window : false
    
    on new_window()
    	tell application "iTerm" to create window with default profile
    end new_window
    
    on new_tab()
    	tell application "iTerm" to tell the first window to create tab with default profile
    end new_tab
    
    on call_forward()
    	tell application "iTerm" to activate
    end call_forward
    
    on is_running()
    	application "iTerm" is running
    end is_running
    
    on is_processing()
    	tell application "iTerm" to tell the first window to tell current session to get is processing
    end is_processing
    
    on has_windows()
    	if not is_running() then return false
    	if windows of application "iTerm" is {} then return false
    	true
    end has_windows
    
    on send_text(custom_text)
    	tell application "iTerm" to tell the first window to tell current session to write text custom_text
    end send_text
    
    -- Main
    if has_windows() then
    	-- Open the command in the current session unless it has a running command, e.g., ssh or top
    	if is_processing() then
    		if open_in_new_window then
    			new_window()
    		else
    			new_tab()
    		end if
    	end if
    else
    	-- If iTerm is not running and we tell it to create a new window, we get two
    	-- One from opening the application, and the other from the command
    	if is_running() then
    		new_window()
    	else
    		call_forward()
    	end if
    end if
    
    -- Make sure a window exists before we continue, or the write may fail
    repeat until has_windows()
    	delay 0.01
    end repeat

    new_window()
    send_text("${command.replaceAll('"', '\\"')}")
    call_forward()
  `;

    runAppleScript(script);
  };

  const openFileVsCode = (filename) => {
    // tell application "Visual Studio Code" to open file "etc:hosts"
    runAppleScript(`tell application "Visual Studio Code" to open file "${filename}"`)
  }

  return (
    <List navigationTitle="Homestead">
      <List.Item
        title="Homestead SSH"
        subtitle="#ssh"
        icon={{ source: Icon.ComputerChip }}
        actions={
          <ActionPanel>
            <Action
              title="Open new terminal window with homestead ssh"
              onAction={() => {
                runInTerminal("homestead");
              }}
            />
          </ActionPanel>
        }
      />
      <List.Item
        title="Reload"
        subtitle="#reload"
        icon={{ source: Icon.Repeat }}
        actions={
          <ActionPanel title="#Reload homestead">
            <Action
              title="Reload homestead box"
              onAction={() => {
                runInTerminal("hs-reload");
              }}
            />
          </ActionPanel>
        }
      />
      <List.Item
        title="Configuration editor"
        subtitle="#config"
        icon={{ source: Icon.Brush }}
        actions={
          <ActionPanel>
            <Action
              title="Edit homestead yml file"
              onAction={() => {
                openFileVsCode("Users:amolwankhede:hs-solr:Homestead.yaml");
              }}
            />
          </ActionPanel>
        }
      />
      <List.Item
        title="IP Addresses"
        subtitle="#ips"
        icon={{ source: Icon.Germ }}
        actions={
          <ActionPanel>
            <Action
              title="Edit/View /etc/hosts file"
              onAction={() => {
                openFileVsCode("etc:hosts");
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
