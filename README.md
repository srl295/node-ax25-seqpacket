# node-ax25-seqpacket
socket(AF_AX25, SOCK_SEQPACKET) binding for node.js

[![Build Status](https://travis-ci.org/srl295/node-ax25-seqpacket.svg?branch=master)](https://travis-ci.org/srl295/node-ax25-seqpacket)

work in progress

## building

### local

```shell
node-gyp rebuild
npm i
npm t
```

### using docker

if you do not really have a linux ax25 box

```shell
sh dockerfile/try-all.sh
```

# [LICENSE](LICENSE)

   Copyright 2018 Steven R. Loomis

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
