import styled from 'styled-components';

import { SplitButton } from 'primereact/splitbutton';
import { Badge } from 'primereact/badge';

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


export const SplitButtonCustom = styled(SplitButton)`
    height: 2.5rem;
    background-color: white;

    .p-splitbutton-menubutton {
        //padding: 0;
        width: 3rem;
    }

    .p-button.p-button-raised {
        box-shadow: none;
    }
`;

export const BadgeCustom = styled(Badge)`
    min-width: 1.3rem;
    height: 1.3rem;
    line-height: 1.3rem;

    margin-top: 3px;
    margin-right: 3px;
`;