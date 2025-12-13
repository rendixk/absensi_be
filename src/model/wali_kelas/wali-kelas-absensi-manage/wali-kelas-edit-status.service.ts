import { find_absensi_for_edit_by_id, edit_status_absensi_repo } from "./wali-kelas-edit-status.repo"
import { find_kelas_id } from "../../kelas/kelas_auth/kelas.auth.repo"
import { Status_Kehadiran } from "../../../generated"
import ErrorOutput from "../../../utils/errorOutput"
import chalk from "chalk"

export const edit_status_absensi_service = async (
    absensi_id: number,
    new_status: Status_Kehadiran,
    wali_kelas_id: number
) => {
    const absensi_record = await find_absensi_for_edit_by_id(absensi_id)
    if (!absensi_record) {
        console.log(chalk.redBright(`[ERROR] Absensi record with ID ${absensi_id} not found.`))
        throw new ErrorOutput("Absensi record not found", 404)
    }

    const data_kelas = await find_kelas_id(absensi_record.kelas_id)
    if(!data_kelas || data_kelas.wali_kelas_id !== wali_kelas_id) {
        console.log(chalk.redBright(`[ERROR] Kelas with ID ${absensi_record.kelas_id} not found.`))
        throw new ErrorOutput("Kelas not found", 404)
    }

    if(absensi_record.status !== Status_Kehadiran.missing && new_status === Status_Kehadiran.missing) {
        console.log(chalk.redBright(`[ERROR] Attempt to change status to 'missing' for absensi ID ${absensi_id}. Only MISSING or ALPHA can be edited.`))
        throw new ErrorOutput(`Cannot manually override status '${absensi_record.status}'. Only MISSING or ALPHA can be edited.`, 400)
    }

    if(new_status === Status_Kehadiran.hadir && !absensi_record.clock_in) {
        console.log(chalk.redBright(`[ERROR] Attempt to set status to 'hadir' without clock-in time for absensi ID ${absensi_id}.`))
        throw new ErrorOutput("Cannot set status to HADIR: Clock-in proof is missing.", 400)
    }

    const update_absensi_record = await edit_status_absensi_repo(absensi_id, new_status)
    console.log(chalk.greenBright(`[SUCCESS] Absensi ID ${absensi_id} status updated to '${new_status}' by Wali Kelas ID ${wali_kelas_id}.`))
    return update_absensi_record
}