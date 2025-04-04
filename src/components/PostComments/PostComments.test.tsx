import { render, screen, fireEvent } from '@testing-library/react';
import PostComments from '.';

describe('PostComments', () => {
  test('deve adicionar dois comentários quando o usuário preencher o formulário e clicar no botão', () => {
    // Renderiza o componente
    render(<PostComments />);
    
    // Encontra os elementos pelo seletor de classe
    const commentTextarea = screen.getByRole('textbox');
    const submitButton = screen.getByText('Comentar');
    
    // Adiciona o primeiro comentário
    fireEvent.change(commentTextarea, { target: { value: 'Este é meu primeiro comentário!' } });
    fireEvent.click(submitButton);
    
    // Adiciona o segundo comentário
    fireEvent.change(commentTextarea, { target: { value: 'Este é meu segundo comentário!' } });
    fireEvent.click(submitButton);
    
    // Verifica se os dois comentários foram adicionados à lista
    const commentsList = screen.getByRole('list');
    expect(commentsList).toHaveClass('post-comments');
    
    // Verifica se os comentários específicos estão presentes
    const commentItems = screen.getAllByRole('listitem');
    expect(commentItems).toHaveLength(2);
    
    // Verifica o conteúdo dos comentários
    const commentTexts = screen.getAllByText(/Este é meu .* comentário!/);
    expect(commentTexts).toHaveLength(2);
    expect(commentTexts[0]).toHaveTextContent('Este é meu primeiro comentário!');
    expect(commentTexts[1]).toHaveTextContent('Este é meu segundo comentário!');
  });
});