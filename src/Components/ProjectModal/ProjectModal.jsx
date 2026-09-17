import * as S from './ProjectModal.styles';

function ProjectModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalWindow onClick={(e) => e.stopPropagation()}>
        <S.ModalClose onClick={onClose}>&times;</S.ModalClose>

        <S.ModalImage src={project.images[0]} alt={project.title} />

        <S.ModalTitle>{project.title}</S.ModalTitle>

        <S.ModalInfoRow>
          <S.ModalPrice>{project.priceRange}</S.ModalPrice>
          <S.ModalDuration>Срок: {project.durationDays} дн.</S.ModalDuration>
        </S.ModalInfoRow>

        <S.ModalTags>
          {project.tags.map((tag, idx) => (
            <S.Tag key={idx}>{tag}</S.Tag>
          ))}
        </S.ModalTags>

        <S.ModalDescription>{project.summary}</S.ModalDescription>

        {/* Сюда позже можно добавить «кнопку расчёта» или галерею */}
      </S.ModalWindow>
    </S.ModalOverlay>
  );
}

export default ProjectModal;
