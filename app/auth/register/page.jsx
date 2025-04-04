'use client';
import React, { useState } from 'react';
import AuthenticateComponent from '@/app/components/auth/register/AuthenticateComponent';
import AgreeComponent from '@/app/components/auth/register/AgreeComponent';
import FormComponent from '@/app/components/auth/register/FormComponent';
import CompleteComponent from '@/app/components/auth/register/CompleteComponent';

export default function page() {
  const [phase, setPhase] = useState('Authenticate'); // 초기 단계 설정

  const renderPhaseComponent = () => {
    switch (phase) {
      case 'Authenticate':
        return <AuthenticateComponent setPhase={setPhase} />;
      case 'Agree':
        return <AgreeComponent setPhase={setPhase} />;
      case 'Form':
        return <FormComponent setPhase={setPhase} />;
      case 'Complete':
        return <CompleteComponent />;
      default:
        return null;
    }
  };

  return (
    <div className="content-wrap">
      <div id="main" className="user-auth">
        {renderPhaseComponent()}
      </div>
    </div>
  );
}
