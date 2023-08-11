import React, { useRef, useState } from 'react';
import { useStore } from 'effector-react';
import { useNavigate } from 'react-router-dom';

import { bem } from '../../utils/bem';
import { Page } from '../../Components/page';
import { Button } from '../../Components/button';
import { $authStore } from '../../Components/registration-form/store';

import './index.scss';

const b = bem('welcome-page');

export const Welcome = () => {
    // здесь я забил на чистый код и подкомпоненты
    // и просто сделал все побыстрее

    const { data } = useStore($authStore);
    const redirect = useNavigate();

    const [btnDisabled, setBtnDisabled] = useState(true);

    const scrollBlockRef = useRef<HTMLDivElement | null>(null);

    const handleAgreement = () => {
        debugger;
        localStorage.setItem('agreed', 'true');

        if (data?.type === 'participant') {
            redirect('/participant');
        } else if (data?.type === 'curator') {
            redirect('/curator');
        }
    };

    const handleScroll = () => {
        const scrollTop = scrollBlockRef?.current?.scrollTop || 0;
        const clientHeight = scrollBlockRef?.current?.clientHeight || 0;
        const scrollHeight = scrollBlockRef?.current?.scrollHeight || 0;

        if (scrollTop + clientHeight >= scrollHeight) {
            setBtnDisabled(false);
        }
    };

    return (
        <Page>
            <div className={b()}>
                <h2 className={b('title')}>добро пожаловать!</h2>
                <span className={b('subtitle')}>
                    Прежде чем начать, прочти небольшую справку о&nbsp;предстоящем квесте. Мы понимаем, что читать
                    сейчас не&nbsp;очень хочется, но тут содержится важная информация о&nbsp;квесте, так что лучше этим
                    не&nbsp;пренебрегать
                </span>

                <div className={b('scroll-block')} ref={scrollBlockRef} onScroll={handleScroll}>
                    <h3 className={b('ref-title')}>Что такое Играцентр?</h3>
                    <p className={b('ref-paragraph')}>Ждем нормального текста!</p>
                    <p className={b('ref-paragraph')}>
                        Ежегодно вузы Санкт-Петербурга открывают свои двери для новых ребят из разных уголков нашей
                        огромной страны, именно для первокурсников Организационный комитет СПбГУТ проводит свое самое
                        масштабное мероприятие — спортивно-развлекательный квест «ИграЦентр». Цель квеста — познакомить
                        новоиспеченных студентов с городом, его историей и культурным наследием, а также подарить заряд
                        энергии и неповторимые эмоции!
                    </p>
                    <p className={b('ref-paragraph')}>
                        Ежегодно вузы Санкт-Петербурга открывают свои двери для новых ребят из разных уголков нашей
                        огромной страны, именно для первокурсников Организационный комитет СПбГУТ проводит свое самое
                        масштабное мероприятие — спортивно-развлекательный квест «ИграЦентр». Цель квеста — познакомить
                        новоиспеченных студентов с городом, его историей и культурным наследием, а также подарить заряд
                        энергии и неповторимые эмоции!
                    </p>
                    <p className={b('ref-paragraph')}>
                        Ежегодно вузы Санкт-Петербурга открывают свои двери для новых ребят из разных уголков нашей
                        огромной страны, именно для первокурсников Организационный комитет СПбГУТ проводит свое самое
                        масштабное мероприятие — спортивно-развлекательный квест «ИграЦентр». Цель квеста — познакомить
                        новоиспеченных студентов с городом, его историей и культурным наследием, а также подарить заряд
                        энергии и неповторимые эмоции!
                    </p>
                </div>

                <Button onClick={handleAgreement} disabled={btnDisabled}>
                    ГОТОВО
                </Button>
            </div>
        </Page>
    );
};
