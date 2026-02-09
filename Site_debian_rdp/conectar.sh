#!/bin/bash

export DISPLAY=:0
export XAUTHORITY=/home/SEU_USUARIO/.Xauthority
export PATH=/usr/bin:/bin:/usr/local/bin

xfreerdp3 -f /u: userRDP /p: passwdRDP /v: serverRDP /printer

