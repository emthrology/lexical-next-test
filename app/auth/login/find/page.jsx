'use client';
import React, { useState } from 'react';
import FindComponent from '@/app/components/auth/login/FindComponent';
import ResultComponent from '@/app/components/auth/login/ResultComponent';

export default function find() {
  const [phase, setPhase] = useState('Find'); // 초기 단계 설정
  const phaseContainer = [
    {
      phase: 'Find',
      component: FindComponent,
    },
    {
      phase: 'Result',
      component: ResultComponent,
    },
  ];
  const renderComponent = () => {
    const currentPhase = phaseContainer.find(
      (phaseItem) => phaseItem.phase === phase
    );
    if (currentPhase) {
      const Component = currentPhase.component;
      return <Component setPhase={setPhase} />;
    }
    return null;
  };
  return (
    <div className="content-wrap">
      <div id="main" className="user-auth">
        {renderComponent()}
      </div>
    </div>
  );
}
