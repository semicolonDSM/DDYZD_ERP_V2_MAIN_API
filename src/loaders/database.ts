import { db } from "../models";

const connectDatabase = async (): Promise<void> => {
  try {
    await db.sequelize.sync({ force: false });
    console.log("DATABASE Connection Success");
  } catch(err) {
    console.error(err);
    process.exit(1);
  }
}

export { connectDatabase }