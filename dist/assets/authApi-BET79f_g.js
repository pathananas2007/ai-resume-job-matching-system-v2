import{R as o,S as t}from"./index-B1TTvs0K.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],u=o("eye-off",n),h={login:async(e,r)=>{const a=new FormData;return a.append("username",e),a.append("password",r),t("/auth/login",{data:a})},register:async e=>{var a;const r={seeker:"JOB_SEEKER",recruiter:"RECRUITER"};return t("/auth/register",{data:{full_name:e.full_name,email:e.email,password:e.password,role:r[(a=e.role)==null?void 0:a.toLowerCase()]||"JOB_SEEKER"}})},getGoogleAuthUrl:async()=>t("/auth/oauth/google/authorize"),getGitHubAuthUrl:async()=>t("/auth/oauth/github/authorize")};export{u as E,h as a};
