<title>Blog Cariri</title>
<meta charset="utf-8" />
<link href="{{ asset('assets/images/logo.png') }}" rel="icon">
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
<link rel="stylesheet" href="{{asset('webfiles/css/main.css')}}" />

<meta name="theme-color" content="#F56A6A"/>
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
<link rel="stylesheet" href="{{ asset('webfiles/css/config.css') }}" />


<meta name="description" content="Blog mais atualizado do cariri" />
<meta property="og:title" content="Blog Cariri" />
<meta property="og:type" content="article" />
<meta property="og:url" content="https://blogcariri.madgic.com.br/" />
<meta property="og:image" content="https://blogcariri.madgic.com.br/images/logo.png" />
<meta property="og:description" content="Blog mais atualizado do cariri." />
<meta property="og:site_name" content="https://blogcariri.madgic.com.br/" />

@yield('content-body')
{{--@yield('nav-main')--}}


<script src="{{ asset('webfiles/js/jquery.min.js')}}"></script>
<script src="{{ asset('webfiles/js/browser.min.js') }}"></script>
<script src="{{ asset('webfiles/js/breakpoints.min.js') }}"></script>
<script src="{{ asset('webfiles/js/util.js') }}"></script>
<script src="{{ asset('webfiles/js/main.js') }}"></script>
