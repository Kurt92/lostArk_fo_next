'use client';

import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Box, Paper, Typography, IconButton, Checkbox, FormControlLabel, Divider } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { IExpedition } from "@/shared/types/ExpeditionInterface";

interface DraggableListProps {
    items: IExpedition[]; // 부모로부터 전달받을 데이터
}

const DraggableList: React.FC<DraggableListProps> = ({ items: initialItems }) => {
    const [items, setItems] = useState(initialItems);

    // props 변경 시 업데이트
    useEffect(() => {
        setItems(initialItems);
    }, [initialItems]);

    // 드래그 처리
    const onDragEnd = (result: any) => {
        const { destination, source } = result;
        if (!destination) return;

        const updatedItems = Array.from(items);
        const [movedItem] = updatedItems.splice(source.index, 1);
        updatedItems.splice(destination.index, 0, movedItem);

        setItems(updatedItems);
    };

    // 체크박스 상태 변경
    const toggleCheckbox = (expId: string, bossIndex: number) => {
        setItems((prevItems) =>
            prevItems.map((item) => ({
                ...item,
                bossList: item.bossList.map((boss, index) =>
                    index === bossIndex ? { ...boss, clearAt: !boss.clearAt } : boss
                )
            }))
        );
    };

    // bossNm 기준 그룹화
    const groupBossesByNm = (bossList: any[]) => {
        return bossList.reduce((grouped: Record<string, any[]>, boss) => {
            if (!grouped[boss.bossNm]) {
                grouped[boss.bossNm] = [];
            }
            grouped[boss.bossNm].push(boss);
            return grouped;
        }, {});
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
                {(provided) => (
                    <Box
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        sx={{ width: '100%', maxWidth: '95%', margin: 'auto', mt: 5 }}
                    >
                        {items.map((exp, index) => (
                            <Draggable key={exp.expeditionBossId} draggableId={exp.expeditionBossId} index={index}>
                                {(provided) => (
                                    <Box
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: 1,
                                            width: '100%',
                                        }}
                                    >
                                        <IconButton
                                            {...provided.dragHandleProps}
                                            sx={{
                                                cursor: 'grab',
                                                color: '#424242',
                                                mr: 2,
                                            }}
                                        >
                                            <DragIndicatorIcon />
                                        </IconButton>

                                        <Paper
                                            sx={{
                                                padding: 2,
                                                backgroundColor: '#424242',
                                                color: 'white',
                                                width: '100%',
                                            }}
                                        >
                                            <Typography>{exp.characterNm}</Typography>
                                            <Divider
                                                sx={{
                                                    my: 2,
                                                    mx: 2,
                                                    borderColor: 'grey.300',
                                                }}
                                            />

                                            {/* 그룹화하여 줄바꿈 처리 */}
                                            {Object.entries(groupBossesByNm(exp.bossList)).map(([bossNm, bosses], idx) => (
                                                <Box key={idx} sx={{ mb: 1 }}>
                                                    <Typography sx={{ fontWeight: 'bold' }}>{bossNm}</Typography>
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                        {bosses.map((boss, bossIndex) => (
                                                            <FormControlLabel
                                                                key={boss.expeditionBossId}
                                                                control={
                                                                    <Checkbox
                                                                        id={boss.expeditionId}
                                                                        checked={boss.clearAt}
                                                                        onChange={() =>
                                                                            toggleCheckbox(exp.expeditionBossId, bossIndex)
                                                                        }
                                                                        color="default"
                                                                    />
                                                                }
                                                                label={boss.gate}
                                                            />
                                                        ))}
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Paper>
                                    </Box>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </Box>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default DraggableList;
