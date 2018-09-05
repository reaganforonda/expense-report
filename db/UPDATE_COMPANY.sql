UPDATE companies
SET name = $1,
    address = $2,
    city = $3,
    state = $4,
    zipcode = $5,
    phone = $6
WHERE admin = $7
AND company_id = $8
RETURNING *