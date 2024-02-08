const BasicTable = ({ users, heads }) => {
  const rows = JSON.stringify(users);
  const header = JSON.stringify(heads);
  return (
    <div className='shadow-lg'>
      <basic-table name='User Tabele' rows={rows} heads={header}></basic-table>
    </div>
  );
};

export default BasicTable;
