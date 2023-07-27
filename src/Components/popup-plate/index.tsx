import React from 'react';

import { bem } from '../../utils/bem';

import './index.scss';

interface Props {
    title: string;
    status: 'finished' | 'locked' | 'active';
    numberic?: number;
    defaultExpanded?: boolean;
    children?: React.ReactNode;
    mix?: string;
}

const b = bem('popup-plate');

export const PopupPlate = ({ title, status, numberic, defaultExpanded, children, mix }: Props) => {
    const [expanded, setExpanded] = React.useState(status === 'active' && (defaultExpanded ?? false));

    return (
        <div className={`popup-plate popup-plate_status_${status} ${mix ? mix : ""}`}>
            <div className={b('status-badge', { status })} data-numberic={numberic}>
                {/* content: attr("numberic") */}
            </div>

            <span className={b('title')}>{title}</span>

            <svg
                className={b('expand-button')}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
            >
                <path d="M12 8L6 14L12 8Z" fill="#111111" />
                <path
                    d="M18 14L12 8L6 14"
                    stroke="#AAAAAA"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </div>
    );
};
