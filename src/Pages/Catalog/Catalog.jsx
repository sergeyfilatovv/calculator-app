import * as S from './catalog.Styles'; // стили из файла выше
import {Container} from '../../StyledComponents/Container/Container.styles'
import { useSelector, useDispatch } from 'react-redux';
import { setActiveCategory } from '../../toolkitRedux/catalogSlice';
import ProjectModal from '../../Components/ProjectModal/ProjectModal';
import { useState } from 'react';

function Catalog() {
    const dispatch = useDispatch();
    const { activeCategory, items, isLoading, error } = useSelector(state => state.catalog);

    const [selectedProject, setSelectedProject] = useState(null);

    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    const filteredItems =
        activeCategory === 'all'
        ? items
        : items.filter(item => item.category === activeCategory);

    const openModal = (project) => setSelectedProject(project);
    const closeModal = () => setSelectedProject(null);

    return ( 
        <>
        <Container>
             <S.CatalogTitle>Каталог выполненных работ</S.CatalogTitle>

            <S.FilterGroup>
                {['all', 'Апартаменты', 'Дома', 'Офисы', 'Магазины', 'ШУ', 'ВРУ','Локальные виды работ'].map((cat) => {
                    const isActive = activeCategory === cat;
                    return (
                        <S.FilterButton
                        key={cat}
                        active={isActive}
                        onClick={() => dispatch(setActiveCategory(cat))}
                        >
                        {cat === 'all' ? 'Все' : cat}
                        </S.FilterButton>
                    );
                })}
            </S.FilterGroup>

            <S.Grid>
                {filteredItems.map((item) => (
                <S.Card onClick={() => openModal(item)} key={item.id}>
                    <S.CardImage src={item.images[0]} alt={item.title} />
                    <S.CardBody>
                    <S.CardTitle>{item.title}</S.CardTitle>
                    <S.CardSummary>{item.summary}</S.CardSummary>
                    <S.CardFooter>
                        <span>{item.priceRange}</span>
                        <span>{item.durationDays} дн.</span>
                    </S.CardFooter>
                    </S.CardBody>
                </S.Card>
                ))}
            </S.Grid>
            </Container>
            <ProjectModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={closeModal}
            />
        </>
       
        
        
     );
}

export default Catalog;