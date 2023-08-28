import React, { useRef, useState, useEffect } from 'react';
import { useStore } from 'effector-react';
import { useNavigate } from 'react-router-dom';

import { bem, getIsScrolledToBottom } from '../../../../shared/lib';
import { Page } from '../../../../shared/ui/page';
import { Button } from '../../../../shared/ui/button';
import { BriefArticle } from '../../../../shared/ui/brief-article';

import { $authStore } from '../../../auth';

import './index.scss';

const b = bem('welcome-page');

const markdown =
    'Ждем нормального текста!\n\nЕжегодно вузы Санкт-Петербурга открывают свои двери для новых ребят из разных уголков нашей огромной страны, именно для первокурсников Организационный комитет СПбГУТ проводит свое самое масштабное мероприятие — спортивно-развлекательный квест «ИграЦентр». Цель квеста — познакомить новоиспеченных студентов с городом, его историей и культурным наследием, а также подарить заряд энергии и неповторимые эмоции!\n\nЕжегодно вузы Санкт-Петербурга открывают свои двери для новых ребят из разных уголков нашей огромной страны, именно для первокурсников Организационный комитет СПбГУТ проводит свое самое масштабное мероприятие — спортивно-развлекательный квест «ИграЦентр». Цель квеста — познакомить новоиспеченных студентов с городом, его историей и культурным наследием, а также подарить заряд энергии и неповторимые эмоции!\n\n';

export const WelcomePage = () => {
    const { data } = useStore($authStore);
    const redirect = useNavigate();

    const [btnDisabled, setBtnDisabled] = useState(true);

    const scrollBlockRef = useRef<HTMLDivElement | null>(null);

    const handleAgreement = () => {
        localStorage.setItem('agreed', 'true');

        if (data?.type === 'participant') {
            redirect('/participant');
        } else if (data?.type === 'curator') {
            redirect('/curator');
        }
    };

    const handleScroll = () => {
        if (btnDisabled) {
            // если еще не долистал до конца
            setBtnDisabled(!getIsScrolledToBottom(scrollBlockRef?.current));
        }
    };

    // если блок по дефолту виден уже на полную
    useEffect(() => {
        setTimeout(() => setBtnDisabled(!getIsScrolledToBottom(scrollBlockRef?.current)), 50);
    }, []);

    return (
        <Page>
            <div className={b()}>
                <h2 className={b('title')}>добро пожаловать!</h2>
                <span className={b('subtitle')}>
                    Прежде чем начать, прочти небольшую справку о&nbsp;предстоящем квесте. Мы понимаем, что читать
                    сейчас не&nbsp;очень хочется, но тут содержится важная информация о&nbsp;квесте, так&nbsp;что лучше
                    этим не&nbsp;пренебрегать
                </span>

                <div className={b('scroll-block')} ref={scrollBlockRef} onScroll={handleScroll}>
                    <BriefArticle title="Что такое Играцентр?" color="gray" markdown={markdown} />
                </div>

                <Button onClick={handleAgreement} disabled={btnDisabled}>
                    ГОТОВО
                </Button>
            </div>
        </Page>
    );
};
