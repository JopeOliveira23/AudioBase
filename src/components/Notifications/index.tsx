import { Button } from "primereact/button";
import { useState } from "react";
import * as S from "./style.ts";

const Notifications = () => {
  const [notifyValue, setNotifyValue] = useState(4);
  const [inboxValue, setInboxValue] = useState(20);

  const clearNotify = () => setNotifyValue(0);
  const clearInbox = () => setInboxValue(0);

  return (
    <>
      <div className='p-overlay-badge'>
        <Button
          icon="pi pi-bell"
          text
          raised
          rounded
          onClick={() => clearNotify()}
        />
        {notifyValue !== 0 && (
          <S.BadgeCustom value={notifyValue} severity="danger" />
        )}
      </div>

      <div className='p-overlay-badge'>
        <Button
          icon="pi pi-inbox"
          text
          raised
          rounded
          onClick={() => clearInbox()}
        />
        {inboxValue !== 0 && (
          <S.BadgeCustom value={inboxValue} severity="danger" />
        )}
      </div>
    </>
  );
};

export default Notifications;