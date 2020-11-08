import { Box, Container  } from "@chakra-ui/core";
import {useTable} from 'react-table';
import React from "react";

interface CompProp {
    aflData: any[];
}

const AflLadder: React.FunctionComponent<CompProp> = ({aflData}) => {
    return (
        <Box maxW="md" borderWidth="1px" borderRadius="lg">
            <Container maxW="x4" centerContent>

        {aflData.map((item) => (
            <Box spacing={8} key={"grid__" + item.order}>
                    <span>{item.order}</span>
                    <span>
                        {item.name}
                    </span>
                    <span>
                        {item.played}
                    </span>
                    <span>
                        {item.wins}
                    </span>
                    <span>
                        {item.draw}
                    </span>
                    <span>
                        {item.loss}
                    </span>
                    <span>
                        {item.for}
                    </span>
                    <span>
                        {item.agt}
                    </span>
                    <span>
                        {item.percent}
                    </span>
                    <span>
                        {item.points}
                    </span>
                </Box >
            ))}
            </Container>
        </Box>
    )
}


export default AflLadder;
