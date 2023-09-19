import React from 'react';

import { bem } from '../../lib';
import { Button } from '../button';

import sosIcon from './sos.png';
import orgcomIcon from './orgcom.png';
import techdepIcon from './techdep.png';

import './index.scss';

interface Props {
    mix?: string;
}

const b = bem('support-plate');

export const SupportPlate = ({ mix }: Props) => {
    const handleButtonClick = () => {
        window.open('https://vk.com/platonovdi', '_blank');
    };

    return (
        <div className={b(null, null, mix)}>
            <span className={b('powered')}>
                powered & designed by <b>tech.dep</b>
                <br />
                organized by <b>org.com</b>
            </span>

            <div className={b('controls')}>
                <a href="https://vk.com/platonovdi" target="_blank">
                    <Button color="blue" size="s">
                        <img src={sosIcon} alt="sos" className={b('sos')} />
                    </Button>
                </a>

                <div className={b('dummy')}>
                    <img src={orgcomIcon} alt="org.com" />
                </div>
                <div className={b('dummy')}>
                    <img src={techdepIcon} alt="tech.dep" />
                </div>
            </div>
        </div>
    );
};
