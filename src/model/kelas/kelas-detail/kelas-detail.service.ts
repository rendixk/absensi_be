import { detail_kelas_repo } from "./kelas-detail.repo"

export const detail_kelas_service = async (kelas_id: number) => {
    const detail_kelas = await detail_kelas_repo(kelas_id)
    return detail_kelas
}