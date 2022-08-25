import { useEffect, useState } from "react";
import { ActionPanel, List, Action, Icon, Color } from "@raycast/api";

// https://silverstripe.cloud/naut/project/mbie/environment/uat/overview/
// https://nz.silverstripe.cloud/naut/project/diapassports/environment/uat/overview/

const items = [
  { title: "MBIE 27", stack: "mbie", cloud: true, uatUrl: "mbie", prodUrl: "mbie" },
  { title: "MBIE 30", stack: "mbie30", cloud: false, uatUrl: "mbie30", prodUrl: "mbie30" },
  { title: "Consumer protection", stack: "consume1", cloud: true, uatUrl: "consume1", prodUrl: "consume1" },
  { title: "Callaghan", stack: "callagh1", cloud: true, uatUrl: "callagh1", prodUrl: "callagh1" },
  {
    title: "Callaghan",
    stack: "callaghaninnovation1",
    cloud: false,
    uatUrl: "callaghaninnovation1",
    prodUrl: "callaghaninnovation1",
  },
  { title: "DIA Passports", stack: "diapassports", cloud: false, uatUrl: "diapassports", prodUrl: "diapassports" },
];

const getUrl = (stack) => {
  let isCloud = "";
  if (!stack.cloud) {
    isCloud = "nz.";
  }
  return `https://${isCloud}silverstripe.cloud/naut/project/${stack.stack}`;
};

const getLink = (stack, isProd) => {
  let url = getUrl(stack);
  if (isProd) {
    url += "/environment/prod/overview/";
  } else {
    url += "/environment/uat/overview/";
  }
  return url;
};

const getIcon = (stack) => {
  return stack.cloud ? { source: Icon.Cloud, tintColor: Color.Blue } : { source: Icon.Box, tintColor: Color.Red };
};

export default function NewGrid() {
  //   const [searchText, setSearchText] = useState("");
  //   const [filteredList, filterList] = useState(items);

  //   useEffect(() => {
  //     filterList(items.filter((item) => item.keywords.some((keyword) => keyword.includes(searchText))));
  //   }, [searchText]);

  return (
    <List
      searchBarAccessory={
        <List.Dropdown tooltip="Dropdown With Items">
          <List.Dropdown.Item title="One" value="one" />
          <List.Dropdown.Item title="Two" value="two" />
          <List.Dropdown.Item title="Three" value="three" />
        </List.Dropdown>
      }
    >
      {items.map((item) => (
        <List.Item
          key={item.stack}
          title={item.title}
          icon={getIcon(item)}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser url={getUrl(item)} />
              <ActionPanel.Section title="Danger zone">
                <Action.OpenInBrowser title="UAT" url={getLink(item, false)} />
                <Action.OpenInBrowser title="Prod" url={getLink(item, true)} />
              </ActionPanel.Section>
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
