import {status} from "@/libs/enums";

export const statusColor = (projectStatus:status)=>{
    switch (projectStatus) {
        case status.COMPLETED:{
            return 'text-bg-success';
        }
        case status.CANCELLED:{
            return 'text-bg-danger';
        }
        case status.IN_PROGRESS:{
            return 'text-bg-primary';
        }
        case status.ON_HOLD:{
            return 'text-bg-warning';
        }
        case status.PLANNING:{
            return 'text-bg-info';
        }
    }
}