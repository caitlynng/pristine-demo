import { useState, useMemo } from "react";
import { InputForm, Button, Loading, ManageUpload } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/Settings";
const Settings = () => {
  const { handleSettingsUpdate, showAlert, isLoading } = useAppContext();

  const formRows = [
    {
      type: "text",
      name: "name",
      labelText: "name",
      required: true,
      validate: true,
    },
    {
      type: "email",
      name: "email",
      labelText: "email address",
      required: true,
      validate: true,
    },
    {
      type: "password",
      name: "password",
      labelText: "password",
      required: false,
      validate: true,
    },
    {
      type: "password",
      name: "passwordRetype",
      labelText: "re-type password",
      required: false,
      validate: true,
    },
  ];

  const handleSubmit = (data) => {
    const updatedData = Object.keys(data)
      .flatMap((i) => ({ [i]: data[i].value }))
      .reduce((acc, curr) => {
        return Object.assign(acc, curr);
      }, {});
    handleSettingsUpdate(updatedData);
  };
  const tabs = [
    {
      id: 0,
      name: "profiles",
      content: (
        <InputForm
          formRows={formRows}
          handleSubmit={handleSubmit}
          btnTitle="save"
        />
      ),
    },
    {
      id: 1,
      name: "manage uploads",
      content: <ManageUpload />,
    },
  ];
  const [activeTabId, setActiveTab] = useState(tabs[0].id);

  const activeTab = useMemo(
    () => tabs.find((tab) => tab.id === activeTabId),
    [activeTabId, tabs]
  );

  return (
    <Wrapper className="max-width">
      <div className="page-header analytics__page-header">
        <h4 className="page-title">Settings</h4>
      </div>

      <div className="btn-container">
        {tabs.map((item) => (
          <Button
            key={item.id}
            title={item.name}
            classList={`tab-btn ${activeTabId === item.id ? "active" : ""}`}
            onSetActive={() => setActiveTab(item.id)}
          />
        ))}
      </div>
      {isLoading && <Loading />}
      {activeTab.content}
    </Wrapper>
  );
};

export default Settings;
