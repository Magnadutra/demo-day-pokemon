import { onNavigate } from "../../navigate.js";

export const members = () => {
  const container = document.createElement('main');
  container.className = 'container-card';
  const template = `
    <div class="people" data-people="Kamila">
      <div class="card-people" id="people-Kamila">
        <div class="gridContainerUp-people">
          <h4 class="title">Kamila Moura</h4>
          <h5>SAP006</h5>
          <div class="upLine"></div>
          <div class="backgroundImg-people">
            <img class="members" src="https://github.com/KamilaMoura1.png" alt="">
          </div>
          <div class="downInfo">
            <div class="inside">Laboratória</div>
          </div>
        </div>
        <div class="gridContainerDown-people">
          <div class="info_icon coluna-github"><a href="https://github.com/KamilaMoura1">
            <img src="img/icon-github.png" /></a>
          </div>
          <div class="info_icon coluna-linkedin"><a href="https://www.linkedin.com/in/kamila-moura-programacao/">
            <img src="img/icon-linkedin.png" /></a>
          </div>
        </div>
      </div>
    </div>
        
    <div class="people" data-people="Mariana">
      <div class="card-people" id="people-Mariana">
        <div class="gridContainerUp-people">
          <h4 class="title">Mariana Rocha</h4>
          <h5>SAP006</h5>
          <div class="upLine"></div>
          <div class="backgroundImg-people">
            <img class="members" src="https://github.com/marirr86.png" alt="">
          </div>
          <div class="downInfo">
            <div class="inside">Laboratória</div>
          </div>
        </div>
        <div class="gridContainerDown-people">
          <div class="info_icon coluna-github"><a href="https://github.com/marirr86">
            <img src="img/icon-github.png" /></a>
          </div>
          <div class="info_icon coluna-linkedin"><a href="https://www.linkedin.com/in/mariana-r-rocha/">
            <img src="img/icon-linkedin.png" /></a>
          </div>
        </div>
      </div>
    </div>

    <div class="people" data-people="Magna">
      <div class="card-people" id="people-Magna">
        <div class="gridContainerUp-people">
          <h4 class="title">Magna Dutra</h4>
          <h5>SAP006</h5>
          <div class="upLine"></div>
          <div class="backgroundImg-people">
            <img class="members" src="https://github.com/Magnadutra.png" alt="">
          </div>
          <div class="downInfo">
            <div class="inside">Laboratória</div>
          </div>
        </div>
        <div class="gridContainerDown-people">
          <div class="info_icon coluna-github"><a href="https://github.com/Magnadutra">
            <img src="img/icon-github.png" /></a>
          </div>
          <div class="info_icon coluna-linkedin"><a href="https://www.linkedin.com/in/magna-dutra/">
            <img src="img/icon-linkedin.png" /></a>
          </div>
        </div>
      </div>
    </div>

    <div class="people" data-people="Paloma">
      <div class="card-people" id="people-Paloma">
        <div class="gridContainerUp-people">
          <h4 class="title">Paloma Queiroz</h4>
          <h5>SAP006</h5>
          <div class="upLine"></div>
          <div class="backgroundImg-people">
            <img class="members" src="https://github.com/palomacqueiroz.png" alt="">
          </div>
          <div class="downInfo">
            <div class="inside">Laboratória</div>
          </div>
        </div>
        <div class="gridContainerDown-people">
          <div class="info_icon coluna-github"><a href="https://github.com/palomacqueiroz">
            <img src="img/icon-github.png" /></a>
          </div>
          <div class="info_icon coluna-linkedin"><a href="https://www.linkedin.com/in/palomac-queiroz/">
            <img src="img/icon-linkedin.png" /></a>
          </div>
        </div>
      </div>
    </div>

    <div class="people" data-people="Sabrina">
      <div class="card-people" id="people-Sabrina">
        <div class="gridContainerUp-people">
          <h4 class="title">Sabrina Araujo</h4>
          <h5>SAP006</h5>
          <div class="upLine"></div>
          <div class="backgroundImg-people">
            <img class="members" src="https://github.com/sabrinaaraujo-ds.png" alt="">
          </div>
          <div class="downInfo">
            <div class="inside">Laboratória</div>
          </div>
        </div>
        <div class="gridContainerDown-people">
          <div class="info_icon coluna-github"><a href="https://github.com/sabrinaaraujo-ds">
            <img src="img/icon-github.png" /></a>
          </div>
          <div class="info_icon coluna-linkedin"><a href="https://www.linkedin.com/in/sabrina-araujo-ds/">
            <img src="img/icon-linkedin.png" /></a>
          </div>
        </div>
      </div>
    </div>

    <div class="people" data-people="Vanessa">
      <div class="card-people" id="people-Vanessa">
        <div class="gridContainerUp-people">
          <h4 class="title">Vanessa Lima</h4>
          <h5>SAP006</h5>
          <div class="upLine"></div>
          <div class="backgroundImg-people">
            <img class="members" src="https://avatars.githubusercontent.com/u/83243667?v=4" alt="">
          </div>
          <div class="downInfo">
            <div class="inside">Laboratória</div>
          </div>
        </div>
        <div class="gridContainerDown-people">
          <div class="info_icon coluna-github"><a href="https://github.com/vanessa-cl">
            <img src="img/icon-github.png" /></a></div>
          <div class="info_icon coluna-linkedin"><a href="https://www.linkedin.com/in/vanessa-lima20-">
            <img src="img/icon-linkedin.png" /></a></div>
        </div>
      </div>
    </div>

    <img src="img/pikacute2.gif" class="pikacute">
    <img class="btn-voltar" src="img/botao-voltar.png" alt="icon voltar">
`;

  container.innerHTML = template;

  container.querySelector('.btn-voltar')
    .addEventListener('click', (event) => {
      event.preventDefault();
      onNavigate('/');
    });

  return container;
}