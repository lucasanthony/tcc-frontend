import React, { useEffect, useState } from 'react';

export default function Card(props) {

  return (
    <div class="card" >
      <img src={props.poster} height={600} width={400} />
      <p> {props.sinopse} </p>
      <h3> Resenha do filme:</h3>
      <p> {props.resenha} </p>
      <p>{props.avaliacao}</p>
    </div>
  );
}