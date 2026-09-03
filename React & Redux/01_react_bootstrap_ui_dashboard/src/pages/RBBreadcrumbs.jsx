import { Breadcrumb } from "react-bootstrap";
import { FolderFill, Code } from "react-bootstrap-icons";

const FileBreadcrumb = () => {
    return (
        <div className="d-flex align-items-center p-3">
            <style>{`ol.breadcrumb { --bs-breadcrumb-divider: '>'; }`}</style>
            <Breadcrumb className="mb-0">
                <Breadcrumb.Item href="#" className="d-flex align-items-center gap-1">
                    <FolderFill className="text-warning" size={16} />
                    Assignments
                </Breadcrumb.Item>

                <Breadcrumb.Item href="#" className="d-flex align-items-center gap-1">
                    <FolderFill className="text-warning" size={16} />
                    Project
                </Breadcrumb.Item>

                <Breadcrumb.Item
                    active
                    className="d-flex align-items-center gap-1"
                >
                    <span className="d-inline-flex align-items-center justify-content-center border border-primary rounded btn-rounded">
                        <Code className="text-primary" size={14} />
                    </span>
                    TodoList
                </Breadcrumb.Item>
            </Breadcrumb>
        </div>
    );
};

export default FileBreadcrumb;