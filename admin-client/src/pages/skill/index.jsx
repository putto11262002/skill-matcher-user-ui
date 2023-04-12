import React, { useState } from 'react'
import SkillTable from '../../components/skill/SkillTable'
import { useQuery } from '@tanstack/react-query';
import skillService from '../../services/skill.service';
import { SKILL_PAGE_SIZE } from '../../constants/skill.contant';
// TODO - add search and filter
const SkillPage = () => {
    const [page, setPage] = useState(0);

    const {data, isError, isLoading, error} = useQuery(['skills', page], () => skillService.searchSkill({pageNumber: page, pageSize: SKILL_PAGE_SIZE}))
   
  return (
    <>
    <SkillTable loading={isLoading} error={error} skills={data?.data?.data} pageNumber={page} total={data?.data?.total || 0} onPageChange={(e, newPage) => setPage(newPage)} />
    </>
  )
}

export default SkillPage