interface CardMembroProps {
  nome: string;
  descricao?: string;
}

export function CardMembro({ nome, descricao }: CardMembroProps) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1rem',
      backgroundColor: '#f9f9f9'
    }}>
      <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{nome}</h3>
      <p style={{ margin: 0, color: '#e91212' }}>{descricao || 'Sem descrição disponível'}</p>
    </div>
  );
}