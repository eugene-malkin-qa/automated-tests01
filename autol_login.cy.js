describe('Проверка авторизации', function () {

    it('Верный логин и верный пароль', function () {
        cy.visit('https://login.qa.studio/');

        cy.get('#mail').type('german@dolnikov.ru');
        cy.get('#pass').type('qa_one_love1');
        cy.get('#loginButton').click();

        cy.get('#messageHeader').contains('Авторизация прошла успешно');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })

    it('Логика восстановления пароля', function () {
        cy.visit('https://login.qa.studio/');

        cy.get('#forgotEmailButton').click();

        cy.get('#mailForgot').type('german@dolnikov.ru');
        cy.get('#restoreEmailButton').click();

        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })

    it('Правильный логин, неправильный пароль', function () {
        cy.visit('https://login.qa.studio/');

        cy.get('#mail').type('german@dolnikov.ru');
        cy.get('#pass').type('qa_one_love2');
        cy.get('#loginButton').click();

        cy.get('#messageHeader').contains('Такого логина или пароля нет');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })

    it('Неправильный логин, правильный пароль', function () {
        cy.visit('https://login.qa.studio/');

        cy.get('#mail').type('german@dolnikovvv.ru');
        cy.get('#pass').type('qa_one_love1');
        cy.get('#loginButton').click();

        cy.get('#messageHeader').contains('Такого логина или пароля нет');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })

    it('Логин без @, правильный пароль', function () {
        cy.visit('https://login.qa.studio/');

        cy.get('#mail').type('germandolnikov.ru');
        cy.get('#pass').type('qa_one_love1');
        cy.get('#loginButton').click();

        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })

    it('Строчные буквы в логине', function () {
        cy.visit('https://login.qa.studio/');

        cy.get('#mail').type('GerMan@Dolnikov.ru');
        cy.get('#pass').type('qa_one_love1');
        cy.get('#loginButton').click();

        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })
})

describe('Проверка покупки нового аватара', function () {                 // название набора тестов
    it('e2e тест на покупку нового аватара для тренера', function () {   // название теста
        cy.visit('https://pokemonbattle.ru/');                          // переходим на сайт https://pokemonbattle.ru/
        cy.get('input[id="k_email"]').type('USER_LOGIN');                   // вводим логин
        cy.get('input[id="k_password"]').type('USER_PASSWORD');               // вводим пароль
        cy.get('button[type="submit"]').click();                // нажимаем кнопку Подтвердить
        cy.wait(2000);
        cy.get('.header_card_trainer').click();            // Клик в шапке на аву тренера
        cy.wait(2000);
        cy.get('.k_mobile > :nth-child(5) > #dropdown > img').click(); // нажимаем кнопку Смена аватара
        cy.get('.available > button').first().click();   // кликаем Купить у первого доступного аватара
        cy.get('.card_number').type('4620869113632996');                     // вводим номер карты
        cy.get('.card_csv').type('125');                             // вводим CVV карты
        cy.get('.card_date').type('1226');                           // вводим срок действия карты
        cy.get('.card_name').type('NAME');                           // вводим имя владельца действия карты
        cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();     // нажимаем кнопку Оплатить
        cy.get('.threeds_number').type('56456');                            // вводим код подтверждения СМС
        cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();   // нажимаем кнопку Оплатить
        cy.contains('Покупка прошла успешно').should('be.visible');     // проверяем наличие и видимость сообщения об успешной покупке
    });
});
