@extends('layouts.page')
@section('css')
    <link rel="stylesheet" href="{{ asset('css/home/init.css') }}">
@endsection
@section('title', 'Suporte - Fábrica 704')
@section('content_header')
    <h1 class="m-0 text-dark">teste</h1>
@stop

@section('content')
    @include('includes.alerts')
    teste
@stop

@section('js')
    <script src="{{ asset('js/modules/home/init.js') }}"></script>
@endsection

