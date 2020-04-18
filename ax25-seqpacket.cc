// Copyright 2018 Steven R. Loomis
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#include <node_api.h>

#include <sys/types.h>
#include <sys/socket.h>
#include <sys/stat.h>
#include <sys/time.h>
#include <sys/wait.h>

#include <netax25/ax25.h>
#include <netax25/axconfig.h>
#include <netax25/axlib.h>
#include <netax25/nrconfig.h>
#include <netax25/rsconfig.h>

#include <netrom/netrom.h>

#include <netrose/rose.h>

namespace ax25 {
  napi_value CreateAndBind(napi_env env, napi_callback_info args) {
    napi_value greeting;
    napi_status status;

    status = napi_create_string_utf8(env, "hello", NAPI_AUTO_LENGTH, &greeting);
    if (status != napi_ok) return nullptr;
    return greeting;
  }

  napi_value init(napi_env env, napi_value exports) {
    napi_status status;
    napi_value fn;

    status = napi_create_function(env, nullptr, 0, CreateAndBind, nullptr, &fn);
    if(status != napi_ok) return nullptr;

    status = napi_set_named_property(env, exports, "createAndBind", fn);
    if (status != napi_ok) return nullptr;
    return exports;

  }

  NAPI_MODULE(NODE_GYP_MODULE_NAME, init)

} // namespace ax25
