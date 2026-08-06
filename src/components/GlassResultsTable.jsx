import { useState, useEffect, useContext } from 'react';
import "../scss/components/GlassResultsTable.scss";

export default function GlassResultsTable({entries = []}) {
  return (
    <table>
      <thead>
        <tr>
          <th>s/n</th>
          <th>size</th>
          <th>per</th>
          <th colSpan="2">sum</th>
        </tr>
      </thead>

      <tbody>
        {entries && entries.map((entry) => (
          <tr key={entry.id} data-id={entry.id}>
            <td></td>
            <td>{entry.size}</td>
            <td>@₦{entry.per}<b>({entry.qty})</b></td>
            <td>₦{entry.price}</td>
            <td><i className="fa fa-close"></i></td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="3">Total</td>
          <td colSpan="2">{entries.reduce((count, entry)=> count+ entry.price),0}</td>
        </tr>
      </tfoot>
    </table>
  )
}
