# Ansible_Repage

Uma solução completa de **automação e configuração de estações de trabalho Linux** via SSH utilizando Ansible, com integração de acesso remoto RDP e gerenciamento centralizado.

---

## 📋 Sumário

- [Visão Geral](#visão-geral)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Funciona](#como-funciona)
- [Métodos de Segurança](#métodos-de-segurança)
- [Requisitos](#requisitos)
- [Como Usar](#como-usar)
- [Para que Serve](#para-que-serve)

---

## 🎯 Visão Geral

O **Ansible_Repage** é um projeto de infraestrutura que automatiza a configuração de máquinas Linux Debian em um ambiente corporativo. Ele realiza:

- ✅ Configuração de conexão SSH via chave pública
- ✅ Instalação e configuração de pacotes do sistema
- ✅ Limpeza de pacotes desnecessários
- ✅ Setup de servidor Node.js para interface web de controle remoto
- ✅ Integração com RDP (Remote Desktop Protocol) para acesso remoto
- ✅ Gerenciamento de inventário OCS (Open Computers and Software)
- ✅ Configuração de autologin automático com LightDM
- ✅ Configuração de atalhos de teclado e interface gráfica

---

## 📁 Estrutura do Projeto

```
ansible/
├── README.md                      # Este arquivo
├── inventory.ini                  # Máquinas alvo da automação
├── playbook.yaml                  # Playbook principal de configuração
├── playbook_First_connec.yaml     # Playbook para iniciar o RDP
│ 
├── group_vars/                    # Diretório para variáveis
│   └── all/                       # Diretório de organização (all vars)
│       └── passwd.yml             # Arquivo Vault para senhas sudoers
│
├── Arquivos/                      # Arquivos de configuração
│   ├── firefox.desktop            # Launcher Firefox em modo kiosk
│   ├── lxde-rc.xml                # Atalhos de teclado e configs Openbox
│   └── arquivo_backup/            # Pasta de Backup (arquivos com informações úteis)
│       └── lightdm.conf           
│
└── Site_debian_rdp/               # Aplicação Node.js para RDP
    ├── server.js                  # Servidor Express
    ├── conectar.sh                # Script para iniciar RDP
    ├── desligar.sh                # Script para desligar a máquina
    ├── package.json               # Dependências Node.js
    └── page/
        └── index.html             # Interface web (Bootstrap)
```


## ⚙️ Como Funciona

O Ansible_Repage utiliza como core de processos o Ansible, Bash e JavaScript para algumas funcionalidades internas. Exemplo de script: `Site_debian_rdp/conectar.sh`.

O fluxo de execução segue os seguintes passos:

1. **Configuração SSH** - Aplica os [Métodos de Segurança](#métodos-de-segurança) ao host remoto
2. **Instalação de pacotes** - Instala dependências necessárias do sistema
3. **Limpeza do sistema** - Remove pacotes desnecessários
4. **Configurações situacionais** - Executa as seguintes customizações:
   - Ativa o CUPS
   - Copia aplicação Site_debian_rdp para o host remoto
   - Ativa o servidor Node.js
   - Configura LightDM
   - Configura atalhos de teclado
   - Modifica interface gráfica
5. **Permissões de poweroff** - Habilita desligamento sem senha (utilizado em `Site_debian_rdp/desligar.sh`)
6. **Reinicialização** - Reinicia a máquina para aplicar todas as alterações 


## 🔐 Métodos de Segurança

A segurança é uma prioridade neste projeto. Além das padronizações nativas do Ansible, foram implementadas:

**Configurações SSH:**
- Conexão somente por chave pública
- Desabilitação de autenticação por senha
- Verificação de IP para conexão (em processo de análise para não limitar o uso)

**Aplicação:**
- Middleware implementado no `server.js`

**Gerenciamento de Credenciais:**
- Ansible Vault para senhas de sudoers
- Chaves SSH armazenadas de forma segura (escolha mais segura do que armazenar senhas SSH no Vault)

## 📋 Requisitos

**No servidor:**
- OpenSSH Server configurado
- Python 3.x instalado

**No localhost (máquina de controle):**
- Ansible 2.9+
- Acesso SSH às máquinas alvo

## 🚀 Como Usar

### Na Estação Remota

- Configurar estação remota com OpenSSH Server

### No LocalHost

1. **Instalar Ansible**
   ```bash
   sudo apt-get install ansible
   ```

2. **Configurar o `inventory.ini`**
   - Adicionar IP de cada máquina alvo
   - Definir usuário de execução
   - Especificar Python interpreter do host remoto
   - Formato: `[IP] ansible_user=[USUARIO] ansible_python_interpreter=/usr/bin/python3`

3. **Configurar o arquivo Vault**
   - Editar `group_vars/all/passwd.yml` (arquivo de senhas do Vault)
   - Configurar de acordo com o modelo dentro do arquivo
   - Criptografar o arquivo:
     ```bash
     ansible-vault encrypt passwd.yml
     ```

4. **Executar o playbook principal**
   - No diretório base, executar:
     ```bash
     ansible-playbook -i inventory.ini playbook.yaml --ask-vault-password
     ```

5. **Executar o playbook RDP (após reinicialização)**
   - Após a máquina reiniciar, executar:
     ```bash
     ansible-playbook -i inventory.ini playbook_First_connec.yaml --ask-vault-password
     ```
   - A janela RDP irá aparecer e pode ser fechada. Processo finalizado!

## ℹ️ Para que Serve?

### 👨‍💻 Automação em Larga Escala

O projeto nasceu da necessidade de reconfigurar aproximadamente **50+ estações de trabalho** que não executavam mais adequadamente:
- Windows 10
- Windows 11

A automação permite migrar essas máquinas para Linux Debian de forma padronizada e eficiente.

### 🔧 Facilitação de Configurações Futuras

A infraestrutura é fisicamente dispersa e de difícil acesso. Este projeto funciona como facilitador para futuras manutenções e modificações, eliminando a necessidade de acesso físico às máquinas.

### 🎯 Objetivos Secundários

- **Segurança** - Padronização e aplicação de boas práticas
- **Escalabilidade** - Facilita adição de novas máquinas ao gerenciamento centralizado


## � Referências

Para detalhes específicos, consulte:
- [Documentação Ansible](https://docs.ansible.com/)
- [Documentação Express.js](https://expressjs.com/)
- [Documentação FreeRDP](https://github.com/FreeRDP/FreeRDP/wiki)

---

**Última atualização:** 23 de janeiro de 2026  
**Versão:** 1.0.0
