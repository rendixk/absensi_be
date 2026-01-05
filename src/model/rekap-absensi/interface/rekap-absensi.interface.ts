import { Status_Kehadiran } from '../../../generated/index';

export interface AggregationResult {
    status: Status_Kehadiran,
    _count: { status: number }
}

export interface CountAbsenceStatus  {
    total_hadir: number,
    total_sakit: number,
    total_izin: number,
    total_alpha: number
}
