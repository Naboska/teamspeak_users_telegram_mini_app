import { Cell, Section } from '@telegram-apps/telegram-ui';
import type { ReactNode } from 'react';

import './DisplayData.css';

export type DisplayDataRow = {
  title?: string;
  value: ReactNode;
};

export interface DisplayDataProps {
  header?: ReactNode;
  footer?: ReactNode;
  rows: DisplayDataRow[];
}

export const DisplayData = ({ header, rows }: DisplayDataProps) => (
  <Section header={header}>
    {rows.map((item, index) => {
      return (
        <Cell key={index} className="display-data__line" subhead={item.title} readOnly multiline>
          <span className="display-data__line-value">{item.value}</span>
        </Cell>
      );
    })}
  </Section>
);
