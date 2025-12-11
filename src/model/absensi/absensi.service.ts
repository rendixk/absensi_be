import { find_all_absensi_today_by_kelas_repo } from "./absensi.repo"
import { find_kelas_id } from "../kelas/kelas_auth/kelas.auth.repo"
import ErrorOutput from "../../utils/errorOutput"
import chalk from "chalk"

type stafRole = "wali_kelas" | "guru"

export const get_daily_absensi_summary = async (kelas_id: number, staff_id: number, staff_role: stafRole) => {
    const data_kelas = await find_kelas_id(kelas_id)
    if(!data_kelas) {
        console.error(chalk.redBright("[Error] Kelas not found"))
        throw new ErrorOutput("Kelas not found", 404)
    }

    const authorized_staff = 
    (staff_role === "wali_kelas" && data_kelas.wali_kelas_id === staff_id) ||
    (staff_role === "guru" && data_kelas.guru_id === staff_id)

    if(!authorized_staff) {
        console.error(chalk.redBright(`[Error] Access denied: Staf ID ${staff_id} has no authorization to view report for Kelas ${kelas_id}`))
        throw new ErrorOutput("Access Denied. You are not authorized to view reports for this class.", 403)
    }

    const absensi_records = await find_all_absensi_today_by_kelas_repo(kelas_id)

    console.log(chalk.greenBright(`[Success] Daily report for Kelas ${kelas_id} retrieved successfully by Staf ${staff_id}`))

    return absensi_records
}