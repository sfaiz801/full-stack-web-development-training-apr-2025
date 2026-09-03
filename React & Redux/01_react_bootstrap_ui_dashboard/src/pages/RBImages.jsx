import { Image, OverlayTrigger, Tooltip } from "react-bootstrap";

const RBImages = () => {
    const users = [
        { id: 1, name: "Radhika Parmar" },
        { id: 2, name: "Rajkumar Jadeja" },
        { id: 3, name: "Amit Sharma" },
        { id: 4, name: "Neha Patel" },
        { id: 5, name: "Sahil Khan" },
    ];

    return (
        <div className="container mt-4">

            {/* Avatar With Name */}
            <h4>Avatar With Name</h4>

            {users.slice(0, 2).map((user) => (
                <div key={user.id} className="d-flex align-items-center mb-3">
                    <Image
                        src="/src/assets/images/avtar.webp"
                        roundedCircle
                        width={40}
                        height={40}
                        className="me-2"
                    />
                    <span>{user.name}</span>
                </div>
            ))}

            {/* Avatar Sizes */}
            <h4 className="mt-4">Avatar Sizes</h4>

            <div className="d-flex gap-3 align-items-center">
                <Image src="/src/assets/images/avtar.webp" roundedCircle width={35} />
                <Image src="/src/assets/images/avtar.webp" roundedCircle width={55} />
                <Image src="/src/assets/images/avtar.webp" roundedCircle width={75} />
                <Image src="/src/assets/images/avtar.webp" roundedCircle width={95} />
            </div>

            {/* Avatar Group */}
            <h4 className="mt-4">Avatar Group</h4>

            <div className="d-flex">
                {users.map((user, index) => (
                    <OverlayTrigger
                        key={user.id}
                        placement="bottom"
                        overlay={<Tooltip>{user.name}</Tooltip>}
                    >
                        <Image
                            src="/src/assets/images/avtar.webp"
                            roundedCircle
                            width={50}
                            height={50}
                            style={{
                                marginLeft: index !== 0 ? "-15px" : "0",
                                border: "3px solid white",
                                cursor: "pointer",
                                transition: "0.3s",
                            }}
                            onMouseOver={(e) => (e.target.style.transform = "translateY(-6px)")}
                            onMouseOut={(e) => (e.target.style.transform = "translateY(0px)")}
                        />
                    </OverlayTrigger>
                ))}
            </div>

        </div>
    );
};

export default RBImages;
