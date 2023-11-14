'use client'
import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { Account as symAccount, NetworkType } from "symbol-sdk";

const AccountGenerator: React.FC = () => {
  const [account, setAccount] = useState<symAccount | null>(null);

  const generateAccount = () => {
    const newAccount = symAccount.generateNewAccount(NetworkType.TEST_NET);
    setAccount(newAccount);
  }

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
<div style={{ padding: '20px', fontFamily: 'monospace', textAlign: 'center' }}>
  <h1 style={{
    fontSize: '2.5rem', /* 大きめのフォントサイズ */
    fontWeight: 'bold', /* 太字 */
    color: '#fff', /* 明るいテキスト色 */
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', /* テキストシャドウ */
    backgroundColor: 'rgba(0, 0, 0, 0.7)', /* 背景オーバーレイ */
    display: 'inline-block', /* 背景をテキストに合わせる */
    padding: '10px', /* 内側の余白 */
    borderRadius: '10px' /* 角の丸み */
  }}>Nononon Account Generator</h1>
  {/* その他のコンポーネント内容 */}
</div>
      <button onClick={generateAccount}>Generate Account</button>
      {account && (
        <div style={{ background: 'rgba(0, 0, 0, 0.7)', padding: '10px', borderRadius: '5px', color: '#fff' }}>
          <div style={{ marginBottom: '10px' }}>
            <p style={{ fontWeight: 'bold' }}>Address:</p>
            <code style={{ display: 'block', padding: '5px' }}>
              {account.address.plain()}
            </code>
            <button onClick={() => handleCopyToClipboard(account.address.plain())}>
              Copy
            </button>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <p style={{ fontWeight: 'bold' }}>Private Key:</p>
            <code style={{ display: 'block', padding: '5px' }}>
              {account.privateKey}
            </code>
            <button onClick={() => handleCopyToClipboard(account.privateKey)}>
              Copy
            </button>
          </div>
          <QRCode value={account.address.plain()} />
        </div>
      )}
    </div>
  );
}

export default AccountGenerator;
