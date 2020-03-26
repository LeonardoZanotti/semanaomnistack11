import React from 'react';

function Header(props) {         // Criando função para o cabeçalho que tem propriedade props; dá pra pegar na forma { title, children } daí vc não usa props.title, só title
    return (                // Função que retorna um html
        <header>
            <h2>
                {props.title}
                {props.children}         
            </h2>        
        </header>   // props.title pega a propriedade title; props.children pega o texto escrito no header
    );
}

export default Header;       // exportando a função