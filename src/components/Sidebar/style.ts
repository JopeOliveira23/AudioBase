import styled from 'styled-components';

export const SidebarContent = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export const SidebarHeader = styled.div`
`;

export const SidebarBody = styled.div`
    overflow-y: auto;      /* scroll só no body */
    height: 21rem;
`;

export const SidebarFooter = styled.footer`
    flex
    z-index: 10;
    text-align: center;

`;