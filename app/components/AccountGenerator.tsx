'use client'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Account as symAccount, NetworkType } from "symbol-sdk";

// qrcode.reactはサーバーサイドレンダリングではなく、クライアントサイドでのみレンダリングするように設定
const QRCode = dynamic(() => import('qrcode.react'), {
  ssr: false
});

const AccountGenerator: React.FC = () => {
  const [account, setAccount] = useState<symAccount | null>(null);
  const [qrData, setQrData] = useState<string | null>(null);

  const generateAccount = () => {
    const newAccount = symAccount.generateNewAccount(NetworkType.TEST_NET);
    setAccount(newAccount);
  }

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  }

  useEffect(() => {
    if (account) {
      const generationHash = 'ACECD90E7B248E012803228ADB4424F0D966D24149B72E58987D2BF2F2AF03C4';
      import('symbol-qr-library').then((QR) => {
        const qr = QR.QRCodeGenerator.createExportAccount(
          account.privateKey,
          NetworkType.TEST_NET,
          generationHash
        );
        setQrData(qr.toJSON());
      });
    }
  }, [account]); // accountが変更されたときにのみこのエフェクトを実行します


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
        }}>
          Nononon Account Generator
        </h1>
      </div>
      <button onClick={generateAccount}>Generate Account</button>
      {account && (
        <div style={{ background: 'rgba(0, 0, 0, 0.7)', padding: '10px', borderRadius: '5px', color: '#fff' }}>
          <div style={{ marginBottom: '10px' }}>
            <p style={{ fontWeight: 'bold' }}>Address:</p>
            <code style={{ display: 'block', padding: '5px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              {account.address.plain()}
            </code>
            <button onClick={() => handleCopyToClipboard(account.address.plain())}>
              Copy
            </button>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <p style={{ fontWeight: 'bold' }}>Private Key:</p>
            <code style={{ display: 'block', padding: '5px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
              {account.privateKey}
            </code>
            <button onClick={() => handleCopyToClipboard(account.privateKey)}>
              Copy
            </button>
          </div>
          <QRCode
            value={qrData as string} // ここにあなたのQRコードのデータ
            size={128} // QRコードのサイズを128ピクセルに設定
            level={"Q"} // エラー訂正レベルをQに設定
            includeMargin={true} // 余白を含める
          />
        </div>
      )}
    </div>
  );
  
}

export default AccountGenerator;
